import { Waveform } from '@uiball/loaders';

const Spinner = () => {
    return (
        <div className="absolute inset-0 bg-gray-700 opacity-70 flex justify-center items-center">
            <Waveform size={40} lineWeight={3.5} speed={1} color="white" />
        </div>
    );
};

export default Spinner;
