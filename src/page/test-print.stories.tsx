import type { Meta, StoryObj } from '@storybook/react-vite';
import { styled } from 'styled-components';

export const Page = styled.div`
  width: 210mm;          /* optional: constrain to A4 width */
  padding: 10mm;
  display: flex;
  flex-direction: column;
  background: white;
  width: 700px;

  @media print {
    break-after: page;    /* modern syntax */
    /* fallback for older browsers */
    /* page-break-after: always; */
  }
`;

const HiddenButton = styled.button`
  @media print {
    display: none !important;
  }
`;

const InputLine = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 350px;
  align-self: end;
  justify-content: space-between;
`;

const Table = styled.div`
    border: solid 2px black;
    display: flex;
    flex-direction: column;
    align-self: end;
    padding: 2px;
    gap: 4px;
`

const HebrewInput = styled.input`
  direction: rtl;
  text-align: right;
  border: solid 1px black;
`;


const DocumentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #d9d9d9;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    //touch-action: none;
    gap: 20px;
`;

function restore(data: string) {
  alert(`Loaded data: ${data}`);
  // TODO: assign the values to your inputs, states, etc.
}

function loadData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.onchange = e => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => restore(JSON.parse(reader.result as string));
    reader.readAsText(file);
  };

  input.click();
}

// Save JSON to file
const handleSaveClick = () => {
    const data = "aaa;bbb;ccc;ddd";
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-data.json";
    a.click();
    URL.revokeObjectURL(url);
};


export const PagesTester: React.FC = () => {

    return (
        <DocumentWrapper>

            <div style={{ display: "flex", gap: "10px" }}>
                <HiddenButton onClick={
                    () => {
                        window.print();
                    }
                }>Print</HiddenButton>

                <HiddenButton onClick={
                    () => {
                        loadData();
                    }
                }>Load</HiddenButton>

                <HiddenButton onClick={
                    () => {
                        handleSaveClick();
                    }
                }>Save</HiddenButton>
            </div>

            <Page>

                <h1>תעודת בדיקת מתקן חשמל</h1>

                <Table>
                    <InputLine>
                        <div>:שם המתקן</div>
                        <HebrewInput></HebrewInput>
                    </InputLine>
                    <InputLine>
                        <div>:תאריך בדיקה</div>
                        <HebrewInput></HebrewInput>
                    </InputLine>
                </Table>
            </Page>
            <Page>
                <h1>תעודת רישום פרטים</h1>
                <Table>
                    <InputLine>
                        <div>:מזמין הבדיקה</div>
                        <HebrewInput></HebrewInput>
                    </InputLine>
                    <InputLine>
                        <div>:שם העבודה</div>
                        <HebrewInput></HebrewInput>
                    </InputLine>
                </Table>
            </Page>
        </DocumentWrapper>
    )
}

const meta = {
    title: '2048/PagesTester',
    component: PagesTester,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    //args: { onClick: fn() },
} satisfies Meta<typeof PagesTester>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PageTester: Story = {
    args: {

    },
};


