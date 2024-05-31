import { Dialog, Transition } from '@headlessui/react';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import React, { Fragment } from 'react';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement> | any) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  newEvent?: { [key: string]: any };
  fields?: { id: number; name: string; type: string; placeholder?: string; options?: { value: string; label: string }[] }[];
  icon: React.ReactNode;
  title: string;
  content?: React.ReactNode;
  handleDelete?: (arg: boolean) => void;
  deleteFn?: () => void;
}

const Modal = ({ 
  showModal, 
  closeModal, 
  handleChange, 
  handleSubmit, 
  newEvent, 
  fields, 
  icon,
  title,
  content,
  handleDelete,
  deleteFn,
}: ModalProps) => {
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className={`relative ${deleteFn ? 'z-20' : ' z-10'}`} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className={deleteFn ? "fixed inset-0 z-20 overflow-y-auto" : "fixed inset-0 z-10 overflow-y-auto"}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                    {handleDelete ? (
                        <div className="mx-auto flex w-full items-center justify-end">
                          <TrashIcon onClick={()=>handleDelete(true)} className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-800" aria-hidden="true" />
                        </div>
                    ) : (
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        {icon}
                      </div>
                    )
                  }
                  <div className="mt-2 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    {fields && 
                    newEvent &&
                    fields.length > 0 && 
                    <form action="submit" onSubmit={handleSubmit}>
                      {fields.map((field) => (
                        <div key={field.id} className="mt-2">
                          {
                            (field.type === 'time') && (
                            <label htmlFor={field.name} className="text-sm font-medium text-gray-700 flex">
                                {field.placeholder}
                            </label>
                            )
                          }
                          {(field.type === 'text' ||
                          field.type === 'date' ||
                          field.type === 'time') && (
                            <input
                              type={field.type}
                              name={field.name}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={newEvent[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder || ''}
                            />
                          )}
                          {field.type === 'textarea' && (
                            <textarea
                              name={field.name}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={newEvent[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder || ''}
                            />
                          )}
                          {field.type === 'select' && (
                            <select
                              name={field.name}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                              value={newEvent[field.name]}
                              onChange={handleChange}
                            >
                              {field.options?.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ))}
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                          disabled={!newEvent.title || !newEvent.description}
                        >
                          Сохранить
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          onClick={closeModal}
                        >
                          Отменить
                        </button>
                      </div>
                    </form>
                    }
                    {content && (
                      <>
                        <div className="mt-2">
                          {content}
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                          <button 
                            type="button" 
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                            font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" 
                            onClick={deleteFn}>
                            Удалить
                          </button>
                          <button 
                            type="button" 
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={closeModal}
                          >
                            Отменить
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;