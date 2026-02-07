import { Input } from "@/components/ui/input";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Inputs = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <div>
      <Input
        className="bg-primary disabled:bg-primary text-white text-center border-none p-6 rounded-3xl
            placeholder:text-gray-500 focus:placeholder:opacity-40 transition-all
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Inputs;
