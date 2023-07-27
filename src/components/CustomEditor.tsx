import { FC } from 'react';
import { useForm } from 'react-hook-form';
import TextAreaAutoSize from 'react-textarea-autosize';
interface CustomEditorProps {
  
}

const CustomEditor: FC<CustomEditorProps> = ({}) => {

    const {} = useForm();


  return (
        <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
        <form
            id='subreddit-post-form'
            className='w-fit'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='prose prose-stone dark:prose-invert'>
            <TextAreaAutosize
                ref={(e) => {
                titleRef(e)
                // @ts-ignore
                _titleRef.current = e
                }}
                {...rest}
                placeholder='Title'
                className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
            />
            <div id='editor' className='min-h-[500px]' />
            <p className='text-sm text-gray-500'>
                Use{' '}
                <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
                Tab
                </kbd>{' '}
                to open the command menu.
            </p>
            </div>
        </form>
        </div>
    )
}

export default CustomEditor