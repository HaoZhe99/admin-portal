"use client";
import { useRouter } from "next/navigation";

const ProductCreate = () => {
  const router = useRouter();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onClickSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const price = formData.get("price");
    const status = formData.get("status");
    const image = formData.get("image");

    const base64Image = await toBase64(image);

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          status: status,
          image: base64Image,
        }),
      });

      if (res.ok) {
        router.push("/product");

        const product = await res.json();

        // setMessage(`Product "${product.name}" created successfully!`)
        // setFormData({ name: '', description: '', price: '' }) // Clear form
      } else {
        const error = await res.json();

        // setMessage(error.message || 'Something went wrong!')
      }
    } catch (error) {
      console.error("Error creating product:", error);

      // setMessage('An error occurred. Please try again.')
    }
  };

  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-white text-slate-500 border">
        <div className="p-6">
          <h3 className="mb-4 text-xl font-medium text-slate-700">
            Product Create
          </h3>

          <form onSubmit={onClickSubmit}>
            <div className="relative my-6">
              <input
                id="id-l01"
                type="text"
                name="name"
                placeholder="product name"
                className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="id-l01"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Product name
              </label>
            </div>

            <div className="relative my-6">
              <input
                id="id-l01"
                type="text"
                name="price"
                placeholder="product price"
                className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="id-l01"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Product price
              </label>
            </div>

            <div className="relative my-6">
              <select
                id="id-10"
                name="status"
                className="relative w-full h-12 px-4 transition-all bg-white border rounded outline-none appearance-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-emerald-500 focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Select a status</option>
                <option value="1">Active</option>
                <option value="0">InActive</option>
              </select>
              <label
                htmlFor="id-10"
                className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-base text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Select an option
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-3.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-10 description-10"
                role="graphics-symbol"
              >
                <title id="title-10">Arrow Icon</title>
                <desc id="description-10">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="relative my-6">
              <input
                id="id-dropzone02"
                name="image"
                type="file"
                className="peer hidden"
                accept=".gif,.jpg,.png,.jpeg"
                multiple
              />
              <label
                htmlFor="id-dropzone02"
                className="flex cursor-pointer flex-col items-center gap-6 rounded border border-dashed border-slate-300 px-6 py-10 text-center"
              >
                <span className="inline-flex h-12 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="File input icon"
                    role="graphics-symbol"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </span>
                <p className="flex flex-col items-center justify-center gap-1 text-sm">
                  <span className="text-emerald-500 hover:text-emerald-500">
                    Upload media
                    <span className="text-slate-500"> or drag and drop </span>
                  </span>
                  <span className="text-slate-600">
                    {" "}
                    PNG, JPG or GIF up to 10MB{" "}
                  </span>
                </p>
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
            >
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
