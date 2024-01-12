# Website builder

The Website builder is a React-based project that empowers users to create landing pages with ease. Users can add container elements, text, and images to their pages, then modify the appearance using a sidebar widget.
While the current styling functionalities are somewhat limited, the project is actively working towards supporting flex and grid layouts.

Benefits of the approach:

- As I am not implementing any positioning logic, the canvas view would be the same as how it would look like in the end-product.
- Adding new features would be just extending the rendering logic with new css values.
- Possible to add animations and background effects just by adding predefined classes.

![Alt text](./resources/app.jpg?raw=true "Screenshot of the app")

## Technologies Used

- React: The project is built on the React framework, making it modular and efficient.
- Jotai: State management is handled by Jotai.
- Tailwind CSS (Future Integration): The project aims to integrate Tailwind CSS for efficient and consistent styling.
- shadcn/ui: Component library
- vite: for bundling

## Things to work on

- Better atom management. Especially in the sidebars.
- Internal structure is not intuitive
- Fixed position escapes the canvas

## Roadmap:

- [x] Canvas that renders blocks
- [x] Sidebar with frames
- [x] Positibility to create frames(images, containers, text)
- [x] Positibility to edit content
- [ ] Positibility to edit text inline
- [ ] Positibility to upload images
- [x] Positibility to edit size
- [ ] Positibility to edit styles(padding, background color, margin, etc)
- [x] Positibility to delete frames
- [ ] Positibility to edit Root as container
- [ ] Positibility to define layout of container (flex, grid, etc)
- [ ] Positibility to edit frame names
- [ ] Don't inline styles
- [ ] Store state server size
- [ ] Create CMS for elements
- [ ] Add sticky position
- [ ] position: fixed shouldn't escape the canvas
- [ ] Cleanup jotai families (and overall imporve usage of atoms)

## How to run the application

```bash
pnpm install
pnpm run dev
```
