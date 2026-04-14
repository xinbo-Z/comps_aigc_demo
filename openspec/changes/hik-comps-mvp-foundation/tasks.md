## 1. Foundation Setup

- [ ] 1.1 Establish the library source structure for `general`, `instrument`, `hooks`, `utils`, `types`, and `styles`
- [ ] 1.2 Configure the build pipeline to emit library-ready JavaScript modules and TypeScript declarations
- [ ] 1.3 Define the public export strategy for top-level and subpath component imports
- [ ] 1.4 Set up the shared theme token structure aligned with Ant Design 6 concepts
- [ ] 1.5 Configure Storybook 8 and Vitest + React Testing Library for public component development

## 2. Foundational Components

- [ ] 2.1 Implement the MVP `Button` component with typed props and core visual states
- [ ] 2.2 Implement the MVP `Form` component with business-friendly layout defaults and typed props
- [ ] 2.3 Implement the MVP `Table` component with typed props and clear empty-state handling
- [ ] 2.4 Implement the MVP `Modal` component with consistent title, content, and action-area structure
- [ ] 2.5 Add Storybook stories and automated tests for all foundational MVP components

## 3. Instrument Display Components

- [ ] 3.1 Implement `WaveformChart` with typed data input, themed rendering, and empty/loading states
- [ ] 3.2 Implement `RealtimeDataTable` with typed row input, status-oriented presentation, and empty-state handling
- [ ] 3.3 Implement `ParamConfigForm` with typed parameter definitions, grouped presentation, validation, and read-only mode
- [ ] 3.4 Add Storybook stories and automated tests for all instrument MVP components

## 4. Integration and Release Readiness

- [ ] 4.1 Verify all public component types and exports are available from documented entry points
- [ ] 4.2 Verify theme token customization affects both foundational and instrument components consistently
- [ ] 4.3 Validate that Storybook covers representative usage and boundary states for all MVP components
- [ ] 4.4 Run the full test and build verification flow for the MVP component library
