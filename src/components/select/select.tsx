import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import styles from './select.module.scss';
import { DropdownIcon } from '@assets/icons/icons';
import ReactSelect, {
  MenuListProps,
  MenuPosition,
  ValueContainerProps,
  components
} from 'react-select';

export type OptionType = {
  value: string;
  label: any;
  isFixed?: boolean;
  isDisabled?: boolean;
  data?: any;
};

export interface SelectProps {
  placeholder: string;
  options: Array<OptionType>;
  showSearchHeader?: boolean;
  menuPlacement?: 'top';
  status?: 'invalid' | boolean;
  name?: string;
  value?: any;
  onChange?: (val: OptionType) => void;
  defaultValue?: OptionType;
  formatOptionLabel?: boolean;
  isDisabled?: boolean;
  className?: string;
  size?: 'xs' | 's' | 'm' | 'l';
  isDummy?: boolean;
  createtable?: boolean;
  handleCreate?: (inputValue?: string) => void;
  searchPlaceHolder?: string;
}
const { MenuList, ValueContainer, SingleValue, Placeholder } = components;

const CustomMenuList = (
  { selectProps, ...props }: MenuListProps<SelectProps, false>,
  select_props: SelectProps
) => {
  // Copied from source
  const ariaAttributes = {
    'aria-autocomplete': 'list',
    'aria-label': selectProps['aria-label'],
    'aria-labelledby': selectProps['aria-labelledby']
  };

  return (
    <div className={styles.menu}>
      {/* {select_props.showSearchHeader ? (
        <Input
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
        //   focusAuto
          type="text"
          size="s"
          value={inputValue}
          onChange={e =>
            onInputChange(e.currentTarget.value, {
              action: 'input-change',
              prevInputValue: ''
            })
          }
          placeholder={
            select_props.searchPlaceHolder
              ? select_props.searchPlaceHolder
              : 'Search...'
          }
          inputProps={{
            onMouseDown: e => e.stopPropagation(),
            onTouchEnd: e => e.stopPropagation(),
            onFocus: onFocus
          }}
          InputProps={{ ...ariaAttributes }}
          onFocus={onFocus}
        />
      ) : null} */}
      <MenuList {...props} selectProps={selectProps} />
    </div>
  );
};

// Set custom `SingleValue` and `Placeholder` to keep them when searching
const CustomValueContainer = ({
  children,
  selectProps,
  ...props
}: ValueContainerProps<SelectProps, false>) => {
  const commonProps = {
    cx: props.cx,
    clearValue: props.clearValue,
    getStyles: props.getStyles,
    getValue: props.getValue,
    hasValue: props.hasValue,
    isMulti: props.isMulti,
    isRtl: props.isRtl,
    options: props.options,
    selectOption: props.selectOption,
    setValue: props.setValue,
    selectProps,
    theme: props.theme
  };

  return (
    <ValueContainer selectProps={selectProps} {...props}>
      {React.Children.map(children, child => {
        return child ? (
          children
        ) : props.hasValue ? (
          <SingleValue
            {...(commonProps as any)}
            isFocused={selectProps?.onFocus}
            isDisabled={selectProps.isDisabled}
            data={props.getValue()}
          >
            {selectProps.getOptionLabel(props.getValue()[0])}
          </SingleValue>
        ) : (
          <Placeholder
            {...(commonProps as any)}
            key="placeholder"
            isDisabled={selectProps.isDisabled}
          >
            {selectProps.placeholder}
          </Placeholder>
        );
      })}
    </ValueContainer>
  );
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon />
    </components.DropdownIndicator>
  );
};

const Select = (props: SelectProps) => {
  const containerRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setDefaultValue(props.defaultValue);
  }, [props.defaultValue]);
  const onDomClick = (e: any) => {
    const menu = containerRef.current?.querySelector('.select__menu');

    if (
      !containerRef.current?.contains(e.target) ||
      !menu ||
      !menu.contains(e.target)
    ) {
      setIsFocused(false);
      setInputValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onDomClick);

    return () => {
      document.removeEventListener('mousedown', onDomClick);
    };
  }, []);

  //   const formatOptionLabel = ({ label, url, icon: Icon, color }) => (
  //     <div style={{ display: 'flex', alignItems: 'center' }}>
  //       <Avatar
  //         url={url}
  //         style={{ marginRight: '8px' }}
  //         icon={Icon ? <Icon className={styles.avatarIcon} /> : undefined}
  //         name={label}
  //         color={color ?? undefined}
  //         circle
  //       />
  //       {label}
  //     </div>
  //   );

  const commonProps = {
    className: clsx(
      'select',
      props.className,
      props.status === 'invalid' && 'invalid',
      props?.size && `select--${props.size}`
    ),
    classNamePrefix: 'select',
    value: props.value,
    name: props.name,
    placeholder: props.placeholder,
    options: props.options as any,
    menuPlacement: props.menuPlacement,
    components: {
      MenuList: (values: any) => CustomMenuList(values, props),
      ValueContainer: CustomValueContainer,
      DropdownIndicator: DropdownIndicator,
      IndicatorSeparator: () => null
    },
    isSearchable: false,
    onFocus: () => {
      setIsFocused(true);
    },
    onChange: (val: OptionType) => {
      props.onChange?.(val);
      setIsFocused(false);
    },
    menuShouldScrollIntoView: false,
    defaultValue: defaultValue,

    isDisabled: props.isDisabled,
    // formatOptionLabel: props.formatOptionLabel ? formatOptionLabel : undefined,
    onInputChange: (val: string) => {
      setInputValue(val);
    },
    inputValue: inputValue,
    menuPosition: (!props.showSearchHeader
      ? 'absolute'
      : undefined) as MenuPosition,
    menuPortalTarget: !props.showSearchHeader
      ? document.querySelector('body')
      : undefined,
    styles: { menuPortal: (base: any) => ({ ...base, zIndex: 99999 }) },
    ...{
      menuIsOpen: isFocused || undefined,
      isFocused: isFocused || undefined
    }
  };

  return (
    <div ref={containerRef}>
      <ReactSelect {...(commonProps as any)} />
    </div>
  );
};
export default Select;
