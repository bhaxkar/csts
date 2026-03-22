interface DropdownProps {
  label: string;
  name: string;
  val: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  option1_label?: string;
  option2_label?: string;
  option3_label?: string;
  option4_label?: string;
  option1_value?: string;
  option2_value?: string;
  option3_value?: string;
  option4_value?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  val,
  onChange,
  option1_label,
  option1_value,
  option2_label,
  option2_value,
  option3_label,
  option3_value,
  option4_label,
  option4_value,
}) => {
  return (
    <div>
      <div className="flex flex-col">
        <label className="text-sm text-primary-text font-mono py-0.5 px-2">
          {label}
        </label>
        <select
          name={name}
          value={val}
          onChange={onChange}
          className="appearance-none border-1 bg-model border-primary-border text-secondary-text rounded-lg px-4 py-1 focus:outline-none"
        >
          {option1_value && <option value={option1_value}>{option1_label}</option> }
          {option2_value && <option value={option2_value}>{option2_label}</option> }
          {option3_value && <option value={option3_value}>{option3_label}</option> }
          {option4_value && <option value={option4_value}>{option4_label}</option> }
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
