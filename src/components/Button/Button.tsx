

interface Props {
   buttonText: string
   onSubmit: (e: any) => void
};
const Button: React.FC<Props> = ({onSubmit, buttonText}) => {
   return (
      <div className="form__btn">
         <button onClick={onSubmit}>{buttonText}</button>
      </div>
   );
};
export default Button;
