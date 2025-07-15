import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "", rules = {} }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Editor
              apiKey="zv8p2x504kyuliy37lvnfvor9wzxw9natrpwhfnybc49x6qc"
              value={value}
              onEditorChange={onChange}
              init={{
                height: 500,
                menubar: true,
                plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                // Add these to fix plugin loading:
                external_plugins: {
                  'advlist': 'https://cdn.tiny.cloud/1/zv8p2x504kyuliy37lvnfvor9wzxw9natrpwhfnybc49x6qc/tinymce/6/plugins/advlist/plugin.min.js',
                  'image': 'https://cdn.tiny.cloud/1/zv8p2x504kyuliy37lvnfvor9wzxw9natrpwhfnybc49x6qc/tinymce/6/plugins/image/plugin.min.js'
                }
              }}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}