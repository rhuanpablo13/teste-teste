const List = ({ children }: any) => {
  return (
    <div className="pointer-events-auto mx-auto ">
      <div className="flex flex-col  bg-white m-auto ">
        <div className="flex-1 overflow-y-auto py-6 ">
          <div className="">
            <div className="flow-root">
              <ul
                role="list"
                className="-my-6 divide-y divide-gray-200 grid gap-4 items-center"
              >
                {children}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
