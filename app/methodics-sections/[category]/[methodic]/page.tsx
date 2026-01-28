import FrameWrapper from "@/components/common/FrameWrapper";
import InfoBlock from "@/components/common/InfoBlock";
import ListBlock from "@/components/common/ListBlock";
import { getMethodicBySlug } from "@/constant/methodics-sections/getMethodicBySlug";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    methodic: string;
  }>;
};

export default async function MethodicDetailPage({ params }: PageProps) {
  const { methodic } = await params;

  const data = await getMethodicBySlug(methodic);

  if (!data) notFound();

  return (
    <section className="px-5 md:pt-50 pt-30 pb-20 overflow-hidden bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <div className="flex flex-col items-center relative">
        <span className="heading-bg lg:leading-7 leading-5 whitespace-nowrap">
          by Bogdana Andreyko
        </span>
        <FrameWrapper
          className="text-center max-w-[1440px] w-full"
          paddingY={50}
          paddingBottom={-30}
          showOrnaments
        >
          <h2 className="heading-2 uppercase md:w-[90%] w-full first-letter md:tracking-normal -tracking-widest">
            {data.title}
          </h2>
        </FrameWrapper>
      </div>
      <div className="flex flex-col md:flex-row justify-between pt-20 gap-12.5 md:gap-0">
        <div className="flex flex-col w-full md:w-[35%] gap-12.5 md:gap-20">
          <InfoBlock title={"Автор / Джерело"} children={data.author_source} />
          <InfoBlock
            title={"Психотерапевтичний напрям / Підхід:"}
            children={data.approach}
          />
          <InfoBlock
            title={"Вік / Цільова група:"}
            children={data.target_audience}
          />
          <InfoBlock title={"Мета"} children={data.goal} />
          {data.purpose && (
          <InfoBlock
            title={"Призначення"}
            children={data.purpose}
            className="w-full "
          />
          )}
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-12.5 md:gap-20">
          <InfoBlock
            title={"Терапевтичний ефект"}
            children={data.therapeutic_effect}
            className="w-full md:w-4/5"
          />
          {data.materials && (
            <InfoBlock
              title="Матеріали"
              children={data.materials}
              className="w-full md:w-4/5"
            />
          )}

          <InfoBlock title="Інструкція" children={data.instruction} />
          <div className="flex flex-col gap-4">
            <h3 className="heading-3 uppercase">рефлексія</h3>
            <ListBlock items={data.reflection_questions ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
}
