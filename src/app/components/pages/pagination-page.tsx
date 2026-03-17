import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { HxPagination } from "../ui/hx-pagination";
import { useState } from "react";

export function PaginationPage() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(1);
  const [page5, setPage5] = useState(1);
  const [page6, setPage6] = useState(8);

  return (
    <ComponentPage name="Pagination" description="Page navigation for tables, lists, and data grids. Shows page labels, numbered page buttons, prev/next arrows, and an optional go-to-page dropdown.">
      <Section title="Full Layout" description="The default pagination shows a page label on the left, numbered buttons with prev/next in the center, and a go-to-page dropdown on the right.">
        <ExampleGrid label="Default (with items)">
          <HxPagination
            totalPages={10}
            currentPage={page1}
            onPageChange={setPage1}
            totalItems={200}
            pageSize={20}
          />
        </ExampleGrid>
      </Section>

      <Section title="Page Label Only" description="When totalItems and pageSize aren't provided, the label shows 'Page X of Y' instead of item ranges.">
        <ExampleGrid label="Page X of Y">
          <HxPagination
            totalPages={25}
            currentPage={page2}
            onPageChange={setPage2}
          />
        </ExampleGrid>
      </Section>

      <Section title="Many Pages" description="Ellipsis dots appear automatically when pages exceed the visible range. The go-to-page dropdown lets users jump directly.">
        <ExampleGrid label="50 pages with dropdown">
          <HxPagination
            totalPages={50}
            currentPage={page6}
            onPageChange={setPage6}
            totalItems={500}
            pageSize={10}
          />
        </ExampleGrid>
      </Section>

      <Section title="Sibling Count" description="Control how many page numbers appear on each side of the current page.">
        <ExampleGrid label="Siblings">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <div>
              <Label>siblingCount=1 (default)</Label>
              <HxPagination totalPages={30} currentPage={page6} onPageChange={setPage6} siblingCount={1} totalItems={300} pageSize={10} />
            </div>
            <div>
              <Label>siblingCount=2</Label>
              <HxPagination totalPages={30} currentPage={page6} onPageChange={setPage6} siblingCount={2} totalItems={300} pageSize={10} />
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts — tables, toolbars, compact UIs.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <div>
              <Label>Small</Label>
              <HxPagination totalPages={10} currentPage={page3} onPageChange={setPage3} size="sm" totalItems={100} pageSize={10} />
            </div>
            <div>
              <Label>Medium (default)</Label>
              <HxPagination totalPages={10} currentPage={page3} onPageChange={setPage3} size="md" totalItems={100} pageSize={10} />
            </div>
            <div>
              <Label>Large</Label>
              <HxPagination totalPages={10} currentPage={page3} onPageChange={setPage3} size="lg" totalItems={100} pageSize={10} />
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Without Dropdown" description="Hide the go-to-page dropdown for simpler pagination.">
        <ExampleGrid label="No dropdown">
          <HxPagination
            totalPages={10}
            currentPage={page4}
            onPageChange={setPage4}
            showPageSelect={false}
            totalItems={100}
            pageSize={10}
          />
        </ExampleGrid>
      </Section>

      <Section title="Without Label" description="Hide the page/items label for minimal pagination.">
        <ExampleGrid label="No label">
          <HxPagination
            totalPages={10}
            currentPage={page4}
            onPageChange={setPage4}
            showPageLabel={false}
            totalItems={100}
            pageSize={10}
          />
        </ExampleGrid>
      </Section>

      <Section title="Few Pages" description="When total pages is small, all pages are shown without ellipsis.">
        <ExampleGrid label="3 pages">
          <HxPagination totalPages={3} currentPage={page5} onPageChange={setPage5} totalItems={30} pageSize={10} />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: "var(--text-caption)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--color-text-tertiary)",
      fontFamily: "var(--font-family-supreme)",
      display: "block",
      marginBottom: "var(--space-2)",
    }}>
      {children}
    </span>
  );
}
