import Modal from "@components/ui/modal";
import ContentCreator from "./CreateContent";

function ContentManager() {
  return (
    <>
      <div>Content</div>
      {/* <ContentCreator
        onSubmit={(e) => {
          console.log(e);
        }}
        onBack={() => {}}
      /> */}

      <Modal
        children={
          <ContentCreator
            onSubmit={(e) => {
              console.log(e);
            }}
            onBack={() => {}}
          />
        }
        trigger={<div>Open</div>}
        title="New Content"
      />
    </>
  );
}

export default ContentManager;
