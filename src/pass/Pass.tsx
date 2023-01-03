type IPass = {
  name?: string;
  dates: [string, string] | string;
  price?: number;
  dateString?: string;
  active?: boolean;
};

type IPassGroup = {
  passes?: Array<IPass>;
};

const Pass = (props: IPassGroup) => {
  return (
    <div
      className={
        'max-w-screen-lg mx-auto gap-8 flex flex-none flex-wrap justify-center items-center'
      }
    >
      {props.passes?.map((pass, i) => (
        <div
          key={i}
          className={`w-full flex-none sm:w-1/3 md:w-1/3 lg:w-1/5 text-center border-bg_blue-0 border-solid border-2 rounded-lg`}
        >
          <div className="bg-bg_blue-0 text-primary-500 py-1 font-semibold uppercase">
            <div className="text-2xl  ">{pass.name}</div>
          </div>
          <div className="px-2 font-semibold py-1 text-center bg-bg_white-0 overflow-hidden">
            <div className="text-4xl font-semibold">R${pass.price}</div>
            <div>{pass.dateString}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Pass };
