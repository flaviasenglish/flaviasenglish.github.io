import React from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../button/Button';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { [key: string]: string }) => {
    const mapping = {
      name: 'entry.1517429895',
      email: 'entry.378689295',
      phone: 'entry.413007825',
      subject: 'entry.1801542905',
      message: 'entry.289170194',
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action =
      'https://docs.google.com/forms/d/e/1FAIpQLSfF24-rcfpGAE3DVquVPMZYjO4dfIkUiiB2xY2GeZx49VL7QQ/formResponse';

    Object.entries(mapping).forEach(([key, gKey]) => {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = gKey;
      hiddenField.value = data[key || ''] || '';

      form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-white-200 text-sm font-bold  text-left"
          htmlFor="grid-name"
        >
          Nome
        </label>
        <input
          className="appearance-none block w-full bg-white text-black border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-name"
          type="text"
          placeholder="Nome"
          {...register('name', {
            required: true,
          })}
        />
        {errors.name && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Campo obrigatório
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-white-200 text-sm font-bold "
          htmlFor="grid-email"
        >
          E-mail
        </label>
        <input
          className="appearance-none block w-full bg-white text-black border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-email"
          type="text"
          placeholder="E-mail"
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email?.type == 'required' && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Campo obrigatório
          </div>
        )}

        {errors.email?.type == 'pattern' && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Digite um e-mail válido
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-white-200 text-sm font-bold "
          htmlFor="grid-phone"
        >
          Telefone ou Whatsapp com DDD
        </label>
        <input
          className="appearance-none block w-full bg-white text-black border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-phone"
          type="text"
          placeholder="Telefone ou Whatsapp com DDD"
          {...register('phone', {
            required: true,
            pattern: /^(\+|\d)(0|[1-9]\d*)(\.\d+)?$/,
          })}
        />
        {errors.phone?.type == 'required' && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Campo obrigatório
          </div>
        )}
        {errors.phone?.type == 'pattern' && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Precisa ser um número
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-white-200 text-sm font-bold "
          htmlFor="grid-subject"
        >
          Assunto
        </label>
        <div className="relative">
          <select
            className="block overflow-ellipsis overflow-hidden appearance-none w-full bg-white border border-gray-100 text-black py-3 px-4 pr-14 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-subject"
            placeholder=""
            {...register('subject', {
              required: true,
            })}
          >
            <option value="" selected disabled>
              Escolha um assunto
            </option>
            <option value={'Tenho interesse em fazer aulas'}>
              Tenho interesse em fazer aulas
            </option>
            <option value={'Quero orçar uma tradução / revisão / transcrição'}>
              Quero orçar uma tradução / revisão / transcrição
            </option>
            <option value={'Já sou cliente e quero deixar uma avaliação'}>
              Já sou cliente e quero deixar uma avaliação
            </option>
            <option value={'Outro'}>Outro</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-800">
            <svg
              className="fill-current h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {errors.subject && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Campo obrigatório
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-white-200 text-sm font-bold "
          htmlFor="grid-message"
        >
          Digite a sua mensagem. Seja específico!
        </label>
        <textarea
          className="appearance-none block w-full bg-white text-black border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-message"
          {...register('message', {
            required: true,
          })}
          placeholder="Mensagem"
        />
        {errors.message && (
          <div className="block uppercase tracking-wide text-sm font-bold text-left text-red-700 ">
            Campo obrigatório
          </div>
        )}
      </div>
      <Button onClick={handleSubmit(onSubmit)} secondary fullWidth>
        Enviar
      </Button>
    </form>
  );
};

export { Contact };
