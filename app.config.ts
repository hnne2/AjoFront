export default defineAppConfig({
  ui: {
    accordion: {
      slots: {
        root: 'faq__list',
        item: 'faq__item',
        header: 'faq__item-header',
        trigger:
          'faq__item-trigger !py-3 group flex-1 flex items-center justify-between gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0',
        content:
          'faq__item-content data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none border-t-1',
        body: 'text-sm pb-3.5',
        leadingIcon: 'shrink-0 size-5',
        trailingIcon:
          'faq__iconify shrink-0 size-10 ms-auto group-data-[state=open]:rotate-225 transition-transform duration-200',
        label: 'typo-h5 text-start break-words',
      },
      variants: {
        disabled: {
          true: {
            trigger: 'cursor-not-allowed opacity-75',
          },
        },
      },
    },
  },
})
