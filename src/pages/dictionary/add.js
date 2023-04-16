import DictForm from '@/contents/Dictionary/DictForm';
import BarLayout from '@/layouts/BarLayout';
import Head from 'next/head';

const AddDictionaryPage = () => {
  return (
    <>
      <Head>
        <title>Add Dictionary | Dailai9966</title>
      </Head>
      <div>
        <DictForm />
      </div>
    </>
  );
};

AddDictionaryPage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
export default AddDictionaryPage;
