import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    register: any;
    error?: string;
    disabled?: boolean;
}


const FormField: React.FC<FormFieldProps> = ({ id, label, type = "text", register, error, disabled = false }) => {
    return (
        <div>
            <Label className="text-xl">{label}</Label>
            <Input
                id={id}
                type={type}
                className="bg-white"
                {...register(id)}
                disabled={disabled}
            />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}

export default FormField;