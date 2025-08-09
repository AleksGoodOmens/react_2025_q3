interface Props {
  message?: string;
}
export const OverlayUpdate = ({ message }: Props) => {
  return (
    <div className="absolute top-0 left-0 z-50 grid h-full w-full place-content-center bg-gray-600/60 duration-300">
      <span className="text-4xl"> {message ? message : 'updating data'}</span>
    </div>
  );
};
