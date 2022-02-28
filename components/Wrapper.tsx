type WrapperProps = {
  title: string;
  children: React.ReactNode;
};

export default function Wrapper({ title, children }: WrapperProps) {
  return (
    <div className="m-auto w-4/5 md:w-3/5 lg:w-1/2">
      <h5 className="p-4 text-4xl	text-center">{title}</h5>
      {children}
    </div>
  );
}
