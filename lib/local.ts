export const addLocalesToPaths = (
  paths: {
    params: {
      id: string;
    };
  }[],
  locales: string[] | undefined
) => {
  if (!locales) {
    return {
      paths,
      fallback: false,
    };
  } else {
    const newPaths = [];
    for (const path of paths) {
      for (const locale of locales) {
        const params = path.params;
        newPaths.push({ params, locale: locale });
      }
    }

    return {
      paths: newPaths,
      fallback: false,
    };
  }
};
