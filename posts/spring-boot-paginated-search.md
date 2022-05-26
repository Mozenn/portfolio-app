---
id: spring-boot-paginated-search
title: Build a Spring Boot REST API with Paginated Full-Text Search using Hibernate Search
bannerPath: /images/post/spring-boot-paginated-search/thumbnail.png
priority: 2
tags: ['Java', 'Spring']
author: Gauthier
date: 26 May 2022
description: In a previous article, we have learned how to add full-text-search to a Spring Boot Rest API using Hibernate Search. In this article, we are going to build on that, and learn how to add paginated search to our existing REST API.
---

In a [previous article](https://gauthier-cassany.com/posts/spring-boot-hibernate-search), we have learned how to add full-text-search to a Spring Boot Rest API using Hibernate Search.

In this article, we are going to build on that, and learn how to add paginated search to our existing REST API.

## Project setup

You can check out the previous blog post to get a detailed walkthrough on how to set up the project using Spring Initializer.

You can also get the final result of the last article on [Github](https://github.com/Mozenn/spring-boot-hibernate-search).

## Extending the data model

The first thing to tackle is to find a way to receive the new data needed to add pagination.

For that, we can extend the SearchRequestDTO.

```java
package com.mozen.springbootpaginatedsearch.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Min;

@Data
@EqualsAndHashCode(callSuper = true)
public class PageableSearchRequestDTO extends SearchRequestDTO{

    @Min(0)
    private int pageOffset;
}
```

We only need to define a single new field, the pageOffset. This field is used to control the index of the page we want to query.

We also define a new PageDTO. This data structure is used to hold the result of our paginated search.

```java
package com.mozen.springbootpaginatedsearch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDTO<T> {

    private List<T> content;
    private long total;
}
```

## Extending the data layer

We declare a new searchPageBy function in the SearchRepository interface.

```java
package com.mozen.springbootpaginatedsearch.repository;

import com.mozen.springbootpaginatedsearch.model.PageDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface SearchRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {

    List<T> searchBy(String text, int limit, String... fields);

    PageDTO<T> searchPageBy(String text, int limit, int offset, String... fields);
}
```

The signature is quite similar to the existing searchBy function. We just add the new offset parameter that indicates the page to query.

We replicate this change to the SearchRepositoryImpl class.

```java
package com.mozen.springbootpaginatedsearch.repository;

import com.mozen.springbootpaginatedsearch.model.PageDTO;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

@Transactional
public class SearchRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID>
        implements SearchRepository<T, ID> {

    private final EntityManager entityManager;

    public SearchRepositoryImpl(Class<T> domainClass, EntityManager entityManager) {
        super(domainClass, entityManager);
        this.entityManager = entityManager;
    }

    public SearchRepositoryImpl(
            JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public List<T> searchBy(String text, int limit, String... fields) {

        SearchResult<T> result = getSearchResult(text, limit, 0, fields);

        return result.hits();
    }

    @Override
    public PageDTO<T> searchPageBy(String text, int limit, int offset, String... fields) {
        SearchResult<T> result = getSearchResult(text, limit, offset, fields);

        return new PageDTO<T>(result.hits(), result.total().hitCount());
    }

    private SearchResult<T> getSearchResult(String text, int limit, int offset, String[] fields) {
        SearchSession searchSession = Search.session(entityManager);

        SearchResult<T> result =
                searchSession
                        .search(getDomainClass())
                        .where(f -> f.match().fields(fields).matching(text).fuzzy(2))
                        .fetch(offset, limit);
        return result;
    }
}
```

We can reuse the existing getSearchResult method, by adding a new “offset” argument. We then use this argument in the Hibernate Search fetch() method, which already provides a signature that accepts the offset parameter for pagination purposes.

The PageDTO is built using the result from the search Query.

## Extending the business layer

We can build on the existing logic by extracting the part handling the field to search on to avoid duplication, and then call the repository function with or without pagination depending on whether we use the searchPlant() method or the searchPlantPage() method.

```java
package com.mozen.springbootpaginatedsearch.service;

import com.mozen.springbootpaginatedsearch.model.PageDTO;
import com.mozen.springbootpaginatedsearch.model.Plant;
import com.mozen.springbootpaginatedsearch.repository.PlantRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PlantService {

    private PlantRepository plantRepository;

    private static final List<String> SEARCHABLE_FIELDS = Arrays.asList("name","scientificName","family");

    public PlantService(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    public List<Plant> searchPlants(String text, List<String> fields, int limit) {

        List<String> fieldsToSearchBy = getFieldsToSearchBy(fields);

        return plantRepository.searchBy(
                text, limit, fieldsToSearchBy.toArray(new String[0]));
    }

    public PageDTO<Plant> searchPlantPage(String text, List<String> fields, int limit, int pageOffset) {
        List<String> fieldsToSearchBy = getFieldsToSearchBy(fields);

        return plantRepository.searchPageBy(
                text, limit, pageOffset, fieldsToSearchBy.toArray(new String[0]));
    }

		// We extract the common logic in a separate function
    private List<String> getFieldsToSearchBy(List<String> fields) {
        List<String> fieldsToSearchBy = fields.isEmpty() ? SEARCHABLE_FIELDS : fields;

        boolean containsInvalidField = fieldsToSearchBy.stream(). anyMatch(f -> !SEARCHABLE_FIELDS.contains(f));

        if(containsInvalidField) {
            throw new IllegalArgumentException();
        }
        return fieldsToSearchBy;
    }
}
```

## Extending the web layer

There is not much to do in this one.

We just need a new endpoint to receive paginated search requests by using our new PageableSearchRequestDTO, and by returning a PageDTO.

```java
package com.mozen.springbootpaginatedsearch.controller;

import com.mozen.springbootpaginatedsearch.model.PageDTO;
import com.mozen.springbootpaginatedsearch.model.PageableSearchRequestDTO;
import com.mozen.springbootpaginatedsearch.model.Plant;
import com.mozen.springbootpaginatedsearch.model.SearchRequestDTO;
import com.mozen.springbootpaginatedsearch.service.PlantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/plant")
public class PlantController {

    private PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping("/search")
    public List<Plant> searchPlants(SearchRequestDTO searchRequestDTO) {

        log.info("Request for plant search received with data : " + searchRequestDTO);

        return plantService.searchPlants(searchRequestDTO.getText(), searchRequestDTO.getFields(), searchRequestDTO.getLimit());
    }

    @GetMapping("/search/page")
    public PageDTO<Plant> searchPlantPage(PageableSearchRequestDTO pageableSearchRequestDTO) {

        log.info("Request for plant page search received with data : " + pageableSearchRequestDTO);

        return plantService.searchPlantPage(pageableSearchRequestDTO.getText(), pageableSearchRequestDTO.getFields(), pageableSearchRequestDTO.getLimit(), pageableSearchRequestDTO.getPageOffset());
    }
}
```

We log the received request data and call our new function defined in the plantService.

## Putting it all together

Time to test our code!

We can start our application with the command line.

```bash
mvn spring-boot:run
```

Similar to the first article, we can either use Postman ...

![postman](/images/post/spring-boot-paginated-search/postman.png)

Or we can use a simple cUrl command.

```bash
// Request page 1 with 2 items per page on all fields

curl -X GET 'http://localhost:9000/plant/search?text=cherry&limit=2&pageOffset=1'

// Request page 2 with 3 items per page on scientificName field

curl -X GET 'http://localhost:9000/plant/search?text=asian&limit=3&fields=name&fields=scientificName&pageOffset=2'
```

And we are done! Our full-text search implementation now supports pagination.

There is still a lot we can add to our implementation, and I will do so in following articles.

You can access the demo project for this blog post here [https://github.com/Mozenn/spring-boot-paginated-search.](https://github.com/Mozenn/spring-boot-paginated-search)
