const Header = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-3xl mb-1 font-bold">
        {title}
      </h1>
      <p className="">
        {subtitle}
      </p>
    </div>
  );
};

export default Header;
