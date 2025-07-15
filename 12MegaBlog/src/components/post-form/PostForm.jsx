import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [imagePreview, setImagePreview] = useState(post?.featuredimage || null);

  const submit = async (data) => {
    if (!isValid) {
      setFormError("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const canProceed = await appwriteService.checkPermissions?.();
      if (canProceed === false) {
        throw new Error("You don't have permission to perform this action");
      }

      if (post) {
        // UPDATE POST
        let fileId = post.featuredimage;

        if (data.image?.[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            await appwriteService.deleteFile(post.featuredimage);
            fileId = file.$id;
            setImagePreview(file.$id);
          }
        }

        const updatedPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          featuredimage: fileId,
          status: data.status,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // CREATE POST
        if (!data.image?.[0]) {
          throw new Error("Featured image is required");
        }

        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) throw new Error("Failed to upload image");

        const newPost = await appwriteService.createPost({
          title: data.title,
          content: data.content,
          featuredimage: file.$id,
          status: data.status,
          slug: data.slug,
          userid: userData.$id,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s-]+/g, "")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full mb-4">
        {formError && (
          <p className="text-red-500 text-center bg-red-50 py-2 rounded">
            {formError}
          </p>
        )}
      </div>

      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          error={errors.title?.message}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: "Slug is required",
            validate: {
              validSlug: (v) =>
                /^[a-z0-9-]+$/.test(v) ||
                "Slug can only contain lowercase letters, numbers and hyphens",
              minLength: (v) =>
                v.length >= 3 || "Slug must be at least 3 characters",
            },
          })}
          error={errors.slug?.message}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          rules={{
            required: "Content is required",
            validate: (value) =>
              value.trim().length > 50 ||
              "Content must be at least 50 characters",
          }}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post && "Image is required",
            onChange: handleImageChange,
          })}
          error={errors.image?.message}
        />

        {(imagePreview || post?.featuredimage) && (
          <div className="w-full mb-4">
            <img
              src={
                typeof imagePreview === "string"
                  ? appwriteService.getFilePreview(imagePreview)
                  : imagePreview
              }
              alt={getValues("title") || "Post preview"}
              className="rounded-lg max-h-60 object-contain w-full"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: "Status is required",
          })}
          error={errors.status?.message}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className={`w-full ${loading ? "animate-pulse" : ""}`}
          disabled={!isValid || loading}
        >
          {loading ? "Processing..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

PostForm.propTypes = {
  post: PropTypes.shape({
    $id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.oneOf(["active", "inactive"]),
    featuredimage: PropTypes.string,
  }),
};