---
id: spring-boot-hibernate-search-conditional-indexing
title: Implement Conditional Indexing in Hibernate Search using Spring Boot
bannerPath: /images/post/spring-boot-hibernate-search-conditional-indexing/thumbnail.png
priority: 2
tags: ['Java', 'Spring']
author: Mozenn
date: 15 Octobre 2022
description: As we have seen in a previous blog post, Hibernate Search can be easily set up in a Spring Boot application to implement Full-Text Search through an HTTP endpoint. But we have only gone across the most basic features of what Hibernate Search provides. In this blog post, we are going to implement Conditional Indexing to skip Plant belonging to a specific family.
---

As we have seen in a [previous blog post](<[https://mozenn.com/posts/spring-boot-hibernate-search](https://mozenn.com/posts/spring-boot-hibernate-search)>), Hibernate Search can be easily set up in a Spring Boot application to implement Full-Text Search through an HTTP endpoint.

But we have only gone across the most basic features of what Hibernate Search provides.

Let’s imagine a use case where we want to index only a part of the indexed entity class. This can be for functional reasons to prevent entities from showing up in the search result depending on the value of a field, or for performance reasons to reduce the index size.

For that, we can use a more advanced feature of Hibernate Search called Conditional Indexing, which is implemented using [Routing Bridges](https://docs.jboss.org/hibernate/stable/search/reference/en-US/html_single/#mapper-orm-bridge-routingkeybridge).

In this blog post, we are going to use the final project from the [previous blog post](https://mozenn.com/posts/spring-boot-hibernate-search) as a starting point, and implement Conditional Indexing to skip Plant belonging to a specific family.

## Implementation

As a starting point, we are using the project from a previous blog post where we set up a Spring Boot application with Hibernate Search.

```java
public class PlantRoutingBinder implements RoutingBinder {

    private static final String FIELD_TO_USE = "name";
    private static final List<String> FAMILIES_TO_IGNORE = Arrays.asList("rosaceae");

    @Override
    public void bind(RoutingBindingContext context) {
        context.dependencies().use(FIELD_TO_USE);

        context.bridge(Plant.class, new Bridge());
    }

    public static class Bridge implements RoutingBridge<Plant> {
        @Override
        public void route(
                DocumentRoutes routes,
                Object entityIdentifier,
                Plant indexedEntity,
                RoutingBridgeRouteContext context) {
            if (FAMILIES_TO_IGNORE.contains(indexedEntity.getFamily())) {
                routes.notIndexed();
            } else {
                routes.addRoute();
            }
        }

        @Override
        public void previousRoutes(
                DocumentRoutes routes,
                Object entityIdentifier,
                Plant indexedEntity,
                RoutingBridgeRouteContext context) {
            routes.addRoute();
        }
    }
}
```

There are two things going on here.

First, we declare a Bridge class implementing the RoutingBridge interface as a nested static class. The nested static class is not mandatory, and you can totally declare this class as a separate class.

The route() method is where we decided what to index and what to skip.

As I have said previously, we filter all plants belonging to the ‘Rosea’ family.

Then, we need to create a new class implementing the RoutingBinder interface, and override the bind method to bind the routing bridge we have just created to the Plant entity type.

We then need to add the Routing Binder to the Indexed Plant class.

```java
@Indexed(routingBinder = @RoutingBinderRef(type = PlantRoutingBinder.class))
@Entity
@Table(name = "plant")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Plant {

    public Plant() {
        this.createdAt = Instant.now();
    }

    public Plant(String name, String scientificName, String family) {
        this.name = name;
        this.scientificName = scientificName;
        this.family = family;
        this.createdAt = Instant.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @FullTextField()
    @NaturalId()
    @Column(name = "name")
    private String name;

    @FullTextField()
    @NaturalId()
    @Column(name = "scientificName")
    private String scientificName;

    @FullTextField()
    @Column(name = "family")
    private String family;

    @Column(name = "createdAt")
    private Instant createdAt ;
}
```

We do that through the @Indexed annotation by adding the reference of the previously defined PlantRoutingBinder.

And that's it !

Now, let’s test this.

## Testing

To test our implementation, we are using Postman the same way as in the previous blog post.

Let’s first see a search request without the Routing Binder added to the Indexed class.

![postman-with-bridge](/images/post/spring-boot-hibernate-search-conditional-indexing/postman-without-bridge.png)

And now, the same request with the Routing Binder.

![postman-without-bridge](/images/post/spring-boot-hibernate-search-conditional-indexing/postman-with-bridge.png)

As you can see, all plants belonging to the Rosaceae family do not show up in the search result anymore, as intended.

In this blog post, we have seen a straightforward use case, but you can use conditional indexing in a more complex way to meet any of your business requirements.

You can access the demo project for this blog post [on Github](https://github.com/Mozenn/spring-boot-hibernate-search-conditional-indexing).
