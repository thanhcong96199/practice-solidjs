interface IPropsInput {
  placeholder: string;
  name: string;
  value: string;
  onChange: (str: string) => void;
}
export default function Input({
  placeholder,
  name,
  value,
  onChange,
}: IPropsInput) {
  console.log("== Input component ===");
  return (
    <input
      placeholder={placeholder}
      name={name}
      value={value || ""}
      onChange={(event) => {
        console.log("value in input", event.target.value);
        onChange(event.target.value);
      }}
      onKeyPress={(event) => {
        console.log("event key press", event.currentTarget.value);
        onChange(event.currentTarget.value);
      }}
    />
  );
}
