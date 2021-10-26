type ComponentProps = {
  pageTitle: string;
  children?: React.ReactNode;
};

export default function PageHeaderWithActions({
  pageTitle,
  children
}: ComponentProps) {
  return (
    <div className="md:flex md:items-center md:justify-between bg-white p-6">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {pageTitle}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">{children}</div>
    </div>
  );
}
