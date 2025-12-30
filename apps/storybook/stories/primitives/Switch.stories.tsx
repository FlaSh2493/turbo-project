import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@turbo-project/ui";

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    defaultChecked: {
      control: "boolean",
      description: "기본 체크 상태",
    },
  },
  args: {
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Switch id="airplane-mode" {...args} />
      <label
        htmlFor="airplane-mode"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: 1,
          cursor: args.disabled ? "not-allowed" : "pointer",
        }}
      >
        Airplane Mode
      </label>
    </div>
  ),
  args: {},
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch id="unchecked" />
        <label htmlFor="unchecked" style={{ fontSize: "14px" }}>
          Unchecked
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch id="checked" defaultChecked />
        <label htmlFor="checked" style={{ fontSize: "14px" }}>
          Checked
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch id="disabled" disabled />
        <label htmlFor="disabled" style={{ fontSize: "14px", color: "#999" }}>
          Disabled
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Switch id="disabled-checked" disabled defaultChecked />
        <label htmlFor="disabled-checked" style={{ fontSize: "14px", color: "#999" }}>
          Disabled & Checked
        </label>
      </div>
    </div>
  ),
};
