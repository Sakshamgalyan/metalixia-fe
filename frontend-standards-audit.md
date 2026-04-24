# Frontend Developer Standards Audit

This document identifies architectural issues, code duplications, and standard violations in the frontend codebase.

## 1. Context & State Management Duplication
> [!IMPORTANT]
> The current Context API implementations for summaries are largely "clone-and-modify," leading to high maintenance overhead.

- **Redundant Reducers & Actions**: 
    - [src/context/Summary/RawMaterial/reducer.ts](file:///c:/Project/Metalixia/frontend/src/context/Summary/RawMaterial/reducer.ts)
    - [src/context/Summary/CompanyMaterial/reducer.ts](file:///c:/Project/Metalixia/frontend/src/context/Summary/CompanyMaterial/reducer.ts)
    - *Issue*: Both handle `page`, `listLoading`, `listData`, and `stats` in the exact same way with slightly different action names.
- **Inconsistent Modal State Patterns**:
    - `RawMaterial`: `modalState: { isOpen, type }`
    - `CompanyMaterial`: `modal: { mode, selectedItem }`
    - *Impact*: Makes it impossible to create a shared "Summary Board" layout or generic modal handlers.

## 2. Component Redundancy
- **Layout Cloning**: ~~`RawMaterialCompt` and `CompanyMaterialCompt` share nearly 80% of their UI structure (Header, Stats Cards, Search Bar, Table, Pagination).~~
    - *(Resolved)*: Replaced large inline duplicate markup with `SummaryTableWrapper`, significantly reducing table/pagination boilerplate.
- **Manual Fetching Logic**: Both components manually handle `fetchData` in `useEffect` and `useCallback`. This logic should reside in a custom hook or the context itself.

## 3. Pattern Inconsistency & Boilerplate
- **Manual Search Debouncing**: ~~Both components implement search debouncing using `setTimeout` and `useEffect` locally.~~
    - *(Resolved)*: Deprecated custom hooks in favor of robust `lodash/debounce` combined with `useMemo` reference stability, completely eliminating typing UX delays.
- **Feature Boilerplate**: Adding a new summary requires 5+ files (reducer, actions, type, hooks, context). This can be significantly reduced by using a generic "CrudContext" or "PaginatedList" factory pattern.

## 4. Design System & Constants
- **Hardcoded Configuration**: Lists like `UNIT_OPTIONS` are defined locally within modal files.
    - [MaterialModal.tsx:L28](file:///c:/Project/Metalixia/frontend/src/components/dashboard/summary/CompanyMaterial/MaterialModal.tsx#L28)
- **Manual Date Formatting**: Components like `CompanyMaterialCompt` import a local `formatDate` helper while `RawMaterialCompt` uses `toLocaleDateString()` inline.
    - *Impact*: Inconsistent date display across the application.

## Recommended Improvements
1. **Generic Pagination Hook**: Create a `usePagination` hook that handles page state, fetching, and debounced searching.
2. **Abstract Context Factory**: Implement a higher-order function to generate the boilerplate for standard "List + Stats + CRUD" modules.
3. **Shared Sidebar/Stats Pattern**: Extract the common dashboard summary layout into a reusable high-level component.
4. **Global Constants**: Centralize shared enums (Units, Roles, Statuses) and formatting utilities.

## 5. Linting & Type Safety Issues (New)
> [!WARNING]
> The frontend fails strict ESLint checks primarily due to un-typed objects (`any`) and unused variables.
- Over 300 problems reported (203 errors, 106 warnings).
- **Focus areas**: Context API declarations often use `any` instead of proper data shapes. Empty interfaces are found in `UploadReports/type.ts`.
- **Recommendation**: Adopt strict generic typing on all Redux and Context API requests, replacing `any` with genuine domain types.
