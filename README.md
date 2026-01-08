# Nexup Frontend Challenge – Enfoque y decisiones de diseño

Este repositorio contiene mi solución al challenge de Frontend para Nexup. El objetivo principal fue resolver los requerimientos funcionales manteniendo **separación de responsabilidades**, **claridad de diseño** y un **código fácilmente extensible**.

---

## Arquitectura general

- **`index.tsx` / `App.tsx`**
  - Se encargan únicamente del bootstrap de la aplicación y de renderizar el contenedor principal `ProductManager`.

- **`ProductManager`**
  - Actúa como _feature container_.
  - Orquesta:
    - El **estado de los filtros** (`productQuery`).
    - La **carga de productos** mediante el hook `useProducts`.
    - El render de `CategoryFilter` y `ProductList`.
  - No conoce detalles de implementación de la API ni de cómo se muestran los productos; solo coordina.

- **`useProducts` (hook)**
  - Encapsula la lógica de **llamadas a datos** y estados derivados:
    - `products`, `loading`, `error`.
  - Separa la obtención de datos del renderizado, respetando Separation of Concerns.

- **Capa de datos (`api/products.service.ts`)**
  - Expone `getProductList(query: IProductQuery)` que simula una API.
  - La única responsabilidad del servicio es **filtrar productos** según los parámetros recibidos y devolver una `Promise<Product[]>`.

- **Modelos (`models/*`)**
  - Definen los tipos de dominio: `Product`, `ProductCategory`, `ProductStatus`.
  - Mantienen el tipado centralizado, evitando que tenga que redefinirse en los componentes.

Este diseño favorece que cada pieza tenga una **responsabilidad única** y que el código sea fácil de testar y extender.

---

## Separation of Concerns y responsabilidad única

Al diseñar la solución, el foco estuvo en que cada archivo/module tenga una responsabilidad clara:

- **Componentes de presentación**
  - `ProductCard` solo se ocupa de **mostrar** un producto (nombre, categoría, precio y estado), delegando el formato de precios a un helper.
  - `ProductList` recibe una lista tipada de `Product` y solo itera/renderiza `ProductCard`.
  - `CategoryFilter` se encarga de la UI y la lógica local de selección de filtros, exponiendo hacia arriba solo las categorías seleccionadas.
    - No conoce la API ni cómo se aplican esos filtros sobre los datos.
    - Su única responsabilidad es **agregar o quitar categorías** de un conjunto y devolver la lista resultante de filtros al componente padre.

- **Lógica de negocio / datos**
  - `useProducts` + `products.service` encapsulan la obtención y filtrado de datos, aislando al resto de la app de los detalles de “de dónde vienen los productos”.

- **Utilidades puras**
  - `utils/price.parse.ts` define `formatPrice`, una función pura para formatear montos en ARS. Esto asegura que la lógica de formato **no quede duplicada en los componentes**.

De esta forma, si mañana cambia la fuente de datos o el formato de precios, el impacto queda limitado y el resto del código se mantiene estable.

---

## Tipado a partir de constantes y enums

El tipado se apoya en **constantes y enums** para mantener coherencia en todo el proyecto:

- `ProductCategory` y `ProductStatus` se definen como enums.
  - Los componentes no trabajan con _strings sueltos_, sino con valores tipados.
  - Esto reduce errores por typos y facilita que el editor/TypeScript ayuden con autocompletado y verificación.

- `IProductQuery` tipa de forma explícita la estructura utilizada para filtrar (`filters: ProductCategory[]`).
  - Cualquier cambio en el contrato de filtrado se refleja automáticamente en los lugares donde se consume.

- El mock `products` utiliza esos mismos enums, alineando datos y tipos.

Este enfoque garantiza que **datos, servicios y componentes compartan el mismo lenguaje de tipos**.

---

## Estilos CSS con metodología BEM

Los estilos se organizaron siguiendo la metodología **BEM (Block, Element, Modifier)** para mantener claridad y escalabilidad en el CSS:

- **Bloques principales**
  - `.product-card`, `.product-list`, `.product-manager`, `.category-filter`.

- **Elementos dentro de bloques**
  - `ProductCard`:
    - `.product-card_name`, `.product-card_grid`, `.product-card_item`, `.product-card_label`, `.product-card_price`, `.product-card_category`, `.product-card_status`.
  - `CategoryFilter`:
    - `.category-filter_title`, `.category-filter_buttons`, `.category-filter_button`.

- **Modificadores**
  - Para el estado de los filtros se usa `.category-filter_button--active`, que aplica el fondo azul cuando el filtro está seleccionado.

Beneficios:

- Facilita **razonar sobre la UI**: cada clase indica claramente a qué bloque/elemento pertenece.
- Evita colisiones de estilos y hace más sencillo extender o refactorizar componentes visuales.

---

## Uso de `Set` para gestionar filtros

En `CategoryFilter` se utiliza un `Set<ProductCategory>` para manejar los filtros aplicados:

- Permite **agregar y quitar** categorías en tiempo O(1) (`add`, `delete`, `has`).
- Facilita la comparación de si una categoría está activa sin tener que buscar en arrays (evitando `indexOf`/`includes` repetidos).
- A partir del `Set` se genera el array de filtros que se envía a `ProductManager` (`[...newFilters]`), manteniendo la interfaz del componente simple.

Este enfoque hace que la lógica de filtros sea más expresiva y performante, especialmente si la cantidad de categorías crece.

---

## Responsividad y layout

El diseño se pensó para ser **responsive** y legible en distintos anchos:

  - `ProductManager` centra el contenido y aplica un fondo neutro a toda la vista.
  - `CategoryFilter` y `ProductList` trabajan con un `max-width` compartido y `margin: 0 auto` para mantenerse centrados en pantallas grandes.
  - `ProductList` cambia de **columna única** en mobile a **dos columnas** en pantallas grandes usando CSS Grid.
  - Las tarjetas (`ProductCard`) usan flex/grid internos para alinear título y detalles (estado, precio, categoría) de forma clara.
  - Los mensajes de estado globales (loading, error, "no products") se muestran centrados, en blanco y en negrita para mantener legibilidad sobre el fondo.

Además, se añadió una **barra de búsqueda** dentro de `CategoryFilter`:

- El input actualiza un estado local `search`.
- Un `useEffect` con debounce de ~300 ms llama a `onSearchChange(search)` para no disparar requests en cada tecla.
- `ProductManager` inyecta este valor en `productQuery.search`, que la capa de datos usa para hacer **fulltext match** sobre el nombre (`p.name.toLowerCase().includes(search)`).

Esto permite combinar filtros por categoría con búsqueda por nombre de forma fluida y sin recargas excesivas.

---

## Resumen

En conjunto, las decisiones de diseño apuntan a:

- Mantener **Separation of Concerns** entre presentación, lógica de negocio y datos.
- Asegurar **responsabilidades únicas** por archivo/componente.
- Aprovechar **TypeScript** con enums y tipos derivados de constantes para evitar errores y mejorar DX.
- Utilizar **BEM en CSS** para un estilado predecible y escalable.
- Usar estructuras adecuadas como `Set` para simplificar la lógica de filtros.

Esto deja una base de código que no solo resuelve el challenge, sino que también es entendible, mantenible y lista para evolucionar.
