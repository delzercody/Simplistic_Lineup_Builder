#Optimizer.py file

from typing import List
from pyomo.environ import *
from pyomo.opt import SolverFactory
from models import Player, Lineup
from ortools.linear_solver import pywraplp

def optimize_lineup(lineup: Lineup, players_pool: List[Player], max_cap: int):
    # Create the solver
    solver = pywraplp.Solver.CreateSolver('SCIP')
    
    # Initialize optimization variables
    x = {}
    for player in players_pool:
        x[player] = solver.IntVar(0, 1, 'x[%s]' % player.name)
        
    # Define constraints
    # 1. Each player can only be chosen once
    for player in players_pool:
        solver.Add(x[player] <= 1)
    
    # 2. The total cost of players chosen should be less than max_cap
    solver.Add(sum(x[player] * player.cost for player in players_pool) <= max_cap)

    # 3. Number of players in the lineup should not exceed the slots available
    available_positions = lineup.get_available_positions() # this method should return a dictionary with positions as keys and available slots as values
    for position, available_slots in available_positions.items():
        solver.Add(sum(x[player] for player in players_pool if player.position == position) <= available_slots)

    # Define objective
    objective = solver.Objective()
    for player in players_pool:
        objective.SetCoefficient(x[player], player.projected_points)
    objective.SetMaximization()

    # Solve and return the optimal lineup
    solver.Solve()
    optimal_lineup = [player for player in players_pool if x[player].solution_value() > 0]

    # Return the names of the players in the optimal lineup
    return [player.name for player in optimal_lineup]

# def optimize_lineup(available_players, positions_needed, remaining_cap):
#     # Prepare player data
#     players = [player.name for player in available_players]
#     positions = {player.name: player.position for player in available_players}
#     salaries = {player.name: player.salary for player in available_players}
#     projected_points = {player.name: player.projected_points for player in available_players}

#     model = ConcreteModel()

#     # Decision variables
#     model.x = Var(players, within=Binary)

#     # Objective function
#     model.objective = Objective(
#         expr=sum(model.x[p] * projected_points[p] for p in players),
#         sense=maximize)

#     # Constraints
#     # We must respect the remaining cap
#     model.weight = Constraint(
#         expr=sum(model.x[p] * salaries[p] for p in players) <= remaining_cap)

#     # We also need to ensure that the lineup is complete, meaning it has the right number of players
#     # We use the sum of values in the 'positionsNeeded' dictionary as the total required
#     model.size = Constraint(
#         expr=sum(model.x[p] for p in players) == sum(positions_needed.values()))
    
#     # We use the keys of the 'lineup_slots' dictionary as the total required
#     model.size = Constraint(
#         expr=sum(model.x[p] for p in players) == len(lineup_slots))
    
#     # We also need to ensure that each slot in the lineup is filled by a player with the correct position
#     for slot, position in lineup_slots.items():
#         model.add_constraint(
#             expr=sum(model.x[p] for p in players if positions[p] == position) >= 1)

#     # Solve the problem
#     solver = SolverFactory('glpk')
#     result = solver.solve(model)

#     # Check if the solver found an optimal solution
#     if result.solver.status != SolverStatus.ok or result.solver.termination_condition != TerminationCondition.optimal:
#         return []

#     # Extract the optimal lineup and return it
#     optimized_players = [p for p in players if model.x[p].value == 1]
#     return optimized_players