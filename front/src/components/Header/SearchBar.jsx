import React from "react";
import { Field, Control, Input, Button, Icon } from "bloomer";
const SearchBar = () => {
  return (
    <Field hasAddons>
      <Control>
        <Input placeholder="Find a post" />
      </Control>
      <Control>
        <Button>
          <Icon className="fa fa-search" />
        </Button>
      </Control>
    </Field>
  );
};

export default SearchBar;
