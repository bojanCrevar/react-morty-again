export default function Wrapper({ title, children }) {
  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">{title}</h5>
      {children}
    </div>
  );
}
