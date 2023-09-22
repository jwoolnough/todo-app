/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef as forwardReactRef } from "react";

type As = React.ElementType;

/**
 * Extract the props of a React element or component
 */
type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<
  Target,
  "transition" | "as" | "color" | "translate" | OmitAdditionalProps
> & {
  htmlTranslate?: "yes" | "no" | undefined;
};

type RightJoinProps<
  SourceProps extends object,
  OverrideProps extends object,
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object,
  AsComponent extends As = As,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent;
};

type ComponentWithAs<Component extends As, Props extends object> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

function forwardRefWithAs<Component extends As, Props extends object>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}

export { forwardRefWithAs };
export type { ComponentWithAs };
