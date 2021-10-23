type PageProps = {
  sideContent?: React.ReactNode;
  children: React.ReactNode;
  pageTitle: string;
};

export default function Content({
  sideContent,
  children,
  pageTitle,
}: PageProps) {
  return (
    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
      <section
        aria-labelledby="primary-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
      >
        <h1 id="primary-heading" className="sr-only">
          {pageTitle}
        </h1>
        {children}
      </section>
      {sideContent && (
        <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
          <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100 overflow-y-auto">
            {sideContent}
          </div>
        </aside>
      )}
    </main>
  );
}
