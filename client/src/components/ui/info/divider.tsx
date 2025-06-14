const DividerWithText = ({ text }: { text: string }) => (
  <div className="my-4 flex w-full items-center">
    <hr className="flex-grow border-t border-gray-300" />
    <span className="mx-4 text-sm text-gray-500 uppercase">{text}</span>
    <hr className="flex-grow border-t border-gray-300" />
  </div>
);

export { DividerWithText };
