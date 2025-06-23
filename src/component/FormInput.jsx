export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1 text-black"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-black border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
