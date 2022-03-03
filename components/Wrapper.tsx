type WrapperProps = {
  title: string;
  children: React.ReactNode;
};

export default function Wrapper({ title, children }: WrapperProps) {
  return (
    <div className="m-auto w-full sm:w-3/4 xl:w-1/2">
      <h5 className="p-4 text-2xl md:text-4xl	text-center">{title}</h5>
      <div className="px-4 ">{children}</div>
    </div>
  );
}
