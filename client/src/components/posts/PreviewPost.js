/*import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Box, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import 'draft-js/dist/Draft.css';

const useStyles = makeStyles({
  root: {
    marginBottom: "0rem"
  }
});

export default ({ storedState }) => {

    const [editorState, setEditorState] = useState( EditorState.createWithContent(convertFromRaw(JSON.parse(storedState))) );

    const classes = useStyles();
    //const contentState = convertFromRaw(storedState);
    //const editorState = EditorState.createWithContent(contentState);
    
    return <Box className={classes.root}>
      <Editor 
      editorState={editorState} 
      readOnly={true} />
      </Box>
}
*/

import React, { useState, useRef } from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromRaw} from 'draft-js';


const RichEditorExample = ({ storedState }) => {

    //const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorState, setEditorState] = useState( EditorState.createWithContent(convertFromRaw(JSON.parse(storedState))) );
    //c//onst editorRef = useRef(null);
    //const focusEditor = (//) => editorRef.current.focus();
    const onChange = (editorState) => setEditorState(editorState);

    

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  }

  

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className={className} >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            //onChange={onChange}
            //placeholder="Tell a story..."
            //ref={editorRef}
            spellCheck={true}
          />
        </div>
      </div>
    );
  
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

const StyleButton =(props) => {

    const onToggle = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };


  
    let className = 'RichEditor-styleButton';
    if (props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={onToggle}>
        {props.label}
      </span>
    );
  
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return <div></div>/*(
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );*/
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return <div></div> /*(
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );*/
};     
export default RichEditorExample;