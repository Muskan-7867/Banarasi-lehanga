type CheckboxItemProps = {
  id: string;
  label: string;
  count?: number;
};

const CheckboxItem = ({ id, label, count }: CheckboxItemProps) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" id={id} className="mr-2" />
      <label htmlFor={id}>
        {label} {count !== undefined && `(${count})`}
      </label>
    </div>
  );
};

export default CheckboxItem;