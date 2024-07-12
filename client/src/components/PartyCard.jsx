import TeamCard from "./TeamCard";

export default function PartyCard({ party, fetchParty }) {
    // console.log(party.Teams)
    return <div className="d-flex">
        {
            party.Teams.map((team) => {
                return <TeamCard key={team.id} team={team} party={party} fetchParty={fetchParty} />
            })
        }
    </div>
}