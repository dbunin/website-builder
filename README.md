# Website builder

The Website builder is a React-based project that empowers users to create landing pages with ease. Users can add container elements, text, and images to their pages, then modify the appearance using a sidebar widget.
While the current styling functionalities are somewhat limited, the project is actively working towards supporting flex and grid layouts.

![Alt text](./resources/app.jpg?raw=true "Screenshot of the app")

## Technologies Used

- React: The project is built on the React framework, making it modular and efficient.
- Jotai: State management is handled by Jotai.
- Tailwind CSS (Future Integration): The project aims to integrate Tailwind CSS for efficient and consistent styling.
- shadcn/ui: Component library
- vite: for bundling

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
