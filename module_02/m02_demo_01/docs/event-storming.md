# 📚 Monolithic BookStoreHub DDD Event Storming Details

Event Storming session for the BookStoreHub, we delved deeper into the process, meticulously identifying and defining bounded contexts through the lens of events, commands, and their interactions. Here's the detailed exploration and collaborative synthesis of our findings. In our recent Event Storming session, we gathered the team including developers, scrum masters, testers, architects, and business stakeholders as domain experts, around a whiteboard, armed with sticky notes and markers. We started mapping out the flow of events and commands within our monolithic app.

<img width="879" alt="bounded-contexts" src="https://gist.github.com/assets/330383/868685d9-3edf-43e7-b483-c056354359c3">


### Team 1's Detailed Findings:
- **Events Identified**: `OrderPlaced`, `StockChecked`, `ReviewSubmitted`
- **Commands**: `CreateOrder`, `CheckStock`, `SubmitReview`
- **Chronological Ordering**: They started with `CreateOrder`, leading to `CheckStock`, and upon successful order placement, `OrderPlaced` event was triggered, concluding with `SubmitReview` resulting in `ReviewSubmitted`.
- **Boundaries Found**: 
    - **Order & Payment Processing**: Combining order creation, stock checking, and payment processing.
    - **Customer Engagement**: Encompassing reviews submission and handling.
- **Named Boundaries**: 
    - **Sales Transactions**: For Order & Payment Processing
    - **User Interaction**: For Customer Engagement
<img width="310" alt="image" src="https://gist.github.com/assets/330383/e365cc40-72db-48ae-a5ff-f8767027df83">



### Team 2's Detailed Findings:
- **Events Identified**: `OrderCreated`, `BookReserved`, `OrderCompleted`, `ReviewAdded`, `RecommendationUpdated`
- **Commands**: `PlaceOrder`, `ReserveBook`, `CompleteOrder`, `AddReview`, `UpdateRecommendation`
- **Chronological Ordering**: Began with `PlaceOrder`, leading to `ReserveBook`, then `OrderCompleted`, alongside `AddReview` leading to `ReviewAdded`, and finally, `UpdateRecommendation`.
- **Boundaries Found**: 
    - **Order Fulfillment**: Covering the entire order lifecycle.
    - **Inventory Management**: Focused on book reservation and stock updates.
    - **Customer Reviews**: Dedicated to review management.
    - **Recommendation Engine**: For updating book recommendations.
- **Named Boundaries**: 
    - **Order Processing**: For Order Fulfillment
    - **Stock Control**: For Inventory Management
    - **Feedback Loop**: For Customer Reviews
    - **Book Suggestions**: For the Recommendation Engine
<img width="287" alt="image" src="https://gist.github.com/assets/330383/86c3c141-45de-4d3b-ab5f-02a0901f6697">

### Collaborative Curation to Four Bounded Contexts:
During the collaboration session, a detailed discussion led to the identification of overlaps and distinctions within the proposed contexts. This was crucial for refining the final bounded contexts.

1. **Order Processing**:
    - **Why Merged/Renamed**: Team 1's "Sales Transactions" and Team 2's "Order Processing" were merged due to their overlapping concern with order lifecycle management. The name "Order Processing" was chosen for its direct relation to the core functionality.

2. **Book Inventory**:
    - **Why Merged/Renamed**: Team 2's "Stock Control" was expanded to "Book Inventory" to include not just stock levels but also book details management, recognizing that inventory encompasses more than just stock control.

3. **Customer Reviews**:
    - **Why Kept**: Both teams identified a customer feedback mechanism, though named differently. It was decided to keep this bounded context as "Customer Reviews" for its clear focus and to align with common industry terminology.

4. **Recommendation System**:
    - **Why Merged/Renamed**: Team 2's "Book Suggestions" directly aligned with the recommendation functionality. It was chosen over Team 1's broader "User Interaction" context, which was deemed too expansive and not solely focused on recommendations.

### Decision Rationale for Discarding/Merging Bounded Contexts:
- **Sales Transactions and Order Fulfillment into Order Processing**: Unified to focus on the order's lifecycle, eliminating redundancy between ordering and payment processes.
- **Stock Control into Book Inventory**: Recognized the need for a broader context that includes book details beyond stock management.
- **User Interaction discarded**: The specific functionalities of reviews and recommendations warranted distinct bounded contexts, making "User Interaction" too broad and non-specific.

This careful deliberation and synthesis of ideas from both teams led to a refined model that accurately represents the core domains of the BookStoreHub, setting a clear path for developing a microservices architecture that is aligned with business capabilities and technical requirements.
<img width="1362" alt="image" src="https://gist.github.com/assets/330383/c45c4200-b9a8-474e-b66a-9be27d18bf20">



#### Team -1 

```
%%{init: {'theme':'base', 'themeVariables': { 'primaryFont': 'PS TT Commons', 'lineColor': '#130F25', 'textColor': '#EBEFF5'}}}%%
graph LR
    subgraph ST["Sales Transactions"]
    direction TB
    STEvents("Events: OrderPlaced, StockChecked"):::eventsBox
    STCommands("Commands: CreateOrder, CheckStock"):::commandsBox
    end

    subgraph UI["User Interaction"]
    direction TB
    UIEvents("Events: ReviewSubmitted"):::eventsBox
    UICommands("Commands: SubmitReview"):::commandsBox
    end

    classDef ST fill:#FF1675,stroke:#130F25,stroke-width:0.6px,color:#EBEFF5,font-family:'PS TT Commons Bold';
    classDef UI fill:#00A3FF,stroke:#130F25,stroke-width:0.6px,color:#EBEFF5,font-family:'PS TT Commons Bold';
    classDef eventsBox fill:#02E088,stroke:#130F25,stroke-width:0.6px,color:#0,font-family:'PS TT Commons Regular';
    classDef commandsBox fill:#FF7B01,stroke:#130F25,stroke-width:0.6px,color:#fff,font-family:'PS TT Commons Regular';
 

    class ST ST;
    class UI UI;

```

#### Final Bounded Contexts

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryFont': 'PS TT Commons'}}}%%
graph TD
    OP(fa:fa-cogs Order Processing):::primaryColor -->|Interacts with| BI(fa:fa-book Book Inventory):::secondaryColor
    OP -->|Triggers| CR(fa:fa-comments Customer Reviews):::actionColor
    BI -->|Updates| RS(fa:fa-lightbulb Recommendation System):::resultColor
    CR -->|Influences| RS

    classDef primaryColor fill:#FF1675,stroke:#130F25,stroke-width:0.6px,color:#EBEFF5,font-family:'PS TT Commons Bold';
    classDef secondaryColor fill:#00A3FF,stroke:#130F25,stroke-width:0.6px,color:#EBEFF5,font-family:'PS TT Commons Bold';
    classDef actionColor fill:#02E088,stroke:#130F25,stroke-width:0.6px,color:#000,font-family:'PS TT Commons Bold';
    classDef resultColor fill:#FFC942,stroke:#130F25,stroke-width:0.6px,color:#000,font-family:'PS TT Commons Bold';
```

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryFont': 'PS TT Commons'}}}%%
graph TD
  subgraph Team1["Team 1 - Event Storming outcome"]
  direction LR

  subgraph OrderPayment["  <b>Order & Payment Processing</b>"]
  direction LR
  OPEvents("fa:fa-users\nEvents: OrderPlaced, StockChecked"):::orderEventsBox
  OPCommands("fa:fa-comment-dots\nCommands: CreateOrder, CheckStock"):::orderCommandsBox
  end

  subgraph CustomerEngagement[" <b>Customer Engagement</b>"]
  direction LR
  CEEvents("fa:fa-users\nEvents: ReviewSubmitted"):::customerEventsBox
  CECommands("fa:fa-comment-dots\nCommands: SubmitReview"):::customerCommandsBox
  end

  end

  classDef orderEventsBox fill:#00A3FF,stroke:#130F25,stroke-width:0.6px,color:#EBEFF5,font-family:'PS TT Commons Regular';
  classDef orderCommandsBox fill:#FFC942,stroke:#130F25,stroke-width:0.6px,color:#0,font-family:'PS TT Commons Regular';
  classDef customerEventsBox fill:#00A3FF,stroke:#130F25,stroke-width:0.6px,color:#EBEFF5,font-family:'PS TT Commons Regular';
  classDef customerCommandsBox fill:#FFC942,stroke:#130F25,stroke-width:0.6px,color:#0,font-family:'PS TT Commons Regular';

  style OrderPayment fill:#02E088,stroke:#130F25,stroke-width:1px,color:#130F25,font-family:'PS TT Commons Bold';
  style CustomerEngagement fill:#FF7B01,stroke:#130F25,stroke-width:1px,color:#130F25,font-family:'PS TT Commons Bold';
```