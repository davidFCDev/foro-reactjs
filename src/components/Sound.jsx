import React, { useState } from 'react';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';

const Sound = () => {
	const [soundOn, setSoundOn] = useState(false);

	const handleSoundToggle = () => {
		setSoundOn(!soundOn);
	};

	return (
		<div className='fixed left-1 sm:left-2 bottom-2 sm:bottom-3 flex gap-1 sm:gap-2 items-center'>
			<div className='flex gap-4'>
				<label className='switch'>
					<input
						type='checkbox'
						className='input'
						value={soundOn}
						onChange={handleSoundToggle}
					/>
					<span className='slider'></span>
					{soundOn && <audio src='/Goodbye Moonmen.mp3' autoPlay loop />}
				</label>
			</div>
			<div className='text-xl'>{soundOn ? <MdMusicNote /> : <MdMusicOff />}</div>
		</div>
	);
};

export default Sound;
