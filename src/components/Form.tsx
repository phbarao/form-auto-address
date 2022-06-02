import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

interface IAddress {
  zipCode: string;
  street: string;
  number: number | string;
  district: string;
  complement?: string;
  city: string;
  state: string;
}

const Form: React.FC = () => {
  const { register, handleSubmit, setFocus, setValue } = useForm<IAddress>();

  const onSubmit = (data: IAddress) => alert(JSON.stringify(data));

  const fetchAddress = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const zipCode = event.target.value.replace(/\D/g, '');
      const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json`);
      const address = await data.json();

      setValue('street', address.logradouro);
      setValue('district', address.bairro);
      setValue('city', address.localidade);
      setValue('state', address.uf);
      setFocus('number');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label>
          CEP
          <input type="text" {...register('zipCode')} onBlur={fetchAddress} />
        </label>

        <label>
          Rua:
          <input type="text" {...register('street')} />
        </label>

        <label>
          Número:
          <input type="text" {...register('number')} />
        </label>

        <label>
          Complemento:
          <input type="text" {...register('complement')} />
        </label>

        <label>
          Bairro:
          <input type="text" {...register('district')} />
        </label>

        <label>
          Cidade:
          <input type="text" {...register('city')} />
        </label>

        <label>
          Estado:
          <input maxLength={2} type="text" {...register('state')} />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default Form;
