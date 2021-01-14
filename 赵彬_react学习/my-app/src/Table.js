import React from 'react';

const TableHeader = props => { 
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Update</th>
                {
                    props.isShow ? (<th>Remove</th>) : null
                }
                
            </tr>
        </thead>
    );
}

const TableBody = props => { 
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td><button onClick={() => props.updateCharacter(index)}>Update</button></td>
                {
                    props.isShow ? (<td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>) : null
                }
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { characterData, removeCharacter, updateCharacter, isShow } = props;
        return (
            <table>
                <TableHeader isShow={isShow} />
                <TableBody characterData={characterData} removeCharacter={removeCharacter} updateCharacter={updateCharacter} isShow={isShow} />
            </table>
        );
}

export default Table;