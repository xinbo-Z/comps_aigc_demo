# 通用组件 antd Wrapper 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将通用基础组件统一调整为基于 Ant Design v6 的封装实现，并补齐相关测试与规范说明。

**Architecture:** 以 antd Button / Input / Table / Form 作为底层实现，保留组件库自身的业务型 props 和视觉覆盖层。先修正 Button 与 Input 的实现和测试，再确认 Table 与 Form 的 wrapper 合规性，最后将规范要求写入设计与计划文档。

**Tech Stack:** React 19, TypeScript 5.x, Ant Design 6.x, Vitest, React Testing Library, Rspress

---

### Task 1: Button wrapper

**Files:**
- Modify: `packages/sci-comp-core/src/components/general/button/types.ts`
- Modify: `packages/sci-comp-core/src/components/general/button/Button.tsx`
- Modify: `apps/sci-comp-test/src/components/general/button/Button.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
test('maps the native button type to antd htmlType', () => {
  render(<Button type="submit">Save</Button>)

  expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter sci-comp-test test -- --run src/components/general/button/Button.test.tsx`
Expected: FAIL because Button still uses old contract

- [ ] **Step 3: Write minimal implementation**

```tsx
<AntButton htmlType={type} loading={loading} disabled={disabled || loading} />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter sci-comp-test test -- --run src/components/general/button/Button.test.tsx`
Expected: PASS

### Task 2: Input wrapper

**Files:**
- Modify: `packages/sci-comp-core/src/components/general/input/types.ts`
- Modify: `packages/sci-comp-core/src/components/general/input/Input.tsx`
- Modify: `apps/sci-comp-test/src/components/general/input/Input.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
test('marks the input invalid and exposes helper text as an alert when invalid', () => {
  render(<Input label="Email" helperText="Email is required" invalid />)

  expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter sci-comp-test test -- --run src/components/general/input/Input.test.tsx`
Expected: FAIL because Input still uses native input

- [ ] **Step 3: Write minimal implementation**

```tsx
<AntInput status={invalid ? 'error' : undefined} />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter sci-comp-test test -- --run src/components/general/input/Input.test.tsx`
Expected: PASS

### Task 3: Wrapper compliance check

**Files:**
- Review: `packages/sci-comp-core/src/components/general/table/Table.tsx`
- Review: `packages/sci-comp-core/src/components/general/form/Form.tsx`
- Review: `packages/sci-comp-core/src/index.ts`
- Review: `apps/sci-comp-test/src/components/general/table/Table.test.tsx`
- Review: `apps/sci-comp-test/src/components/general/form/Form.test.tsx`

- [ ] **Step 1: Verify Table uses antd Table**
- [ ] **Step 2: Verify Form uses antd Form / Form.Item / Form.List**
- [ ] **Step 3: Confirm exports remain intact**
- [ ] **Step 4: Run the related tests**
- [ ] **Step 5: Record the compliance result in the implementation notes**

### Task 4: 规范更新

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/superpowers/specs/2026-04-14-antd-wrapper-general-components-design.md`
- Modify: `docs/superpowers/plans/2026-04-14-antd-wrapper-general-components-implementation-plan.md`

- [ ] **Step 1: Add the antd wrapper requirement to the project rules**
- [ ] **Step 2: Add Modal / Tabs follow-up requirement**
- [ ] **Step 3: Validate the wording is unambiguous**
- [ ] **Step 4: Save and keep the spec/plan consistent**
