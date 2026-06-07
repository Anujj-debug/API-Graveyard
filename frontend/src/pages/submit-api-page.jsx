import SubmitAPIForm from "@/features/registry/components/submit-api-form";

export default function SubmitAPIPage() {
  return (
    <div className="mx-auto max-w-3xl p-10">
      <h1 className="text-4xl font-bold">
        Submit API
      </h1>

      <SubmitAPIForm />
    </div>
  );
}