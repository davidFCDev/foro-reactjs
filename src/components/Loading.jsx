import { Ring } from '@uiball/loaders';

const Loading = () => {
	return (
		<div className='flex items-center justify-center w-full'>
			<Ring size={40} lineWeight={5} speed={2} color='black' />
		</div>
	);
};

export default Loading;
