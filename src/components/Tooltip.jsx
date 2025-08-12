const Tooltip = ({ text, children }) => {
  return (
    <div className="custom-tooltip-wrapper">
      {children}
      <span className="custom-tooltip">{text}</span>
    </div>
  );
};

export default Tooltip;
