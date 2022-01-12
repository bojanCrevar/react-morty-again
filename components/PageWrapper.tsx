type PageWrapperProps = {
  filterComponent: React.ReactNode;
  content: React.ReactNode;
};

const PageWrapper = ({ filterComponent, content }: PageWrapperProps) => {
  return (
    <div className="flex mb-4 w-full">
      <div className="w-1/4">
        <div className="w-1/2 ml-28 mt-44">{filterComponent}</div>
      </div>
      <div className="w-1/2">{content}</div>
    </div>
  );
};

export default PageWrapper;
