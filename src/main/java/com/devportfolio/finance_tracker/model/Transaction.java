package com.devportfolio.finance_tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table (name = "transactions")
@Data
public class Transaction {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;    

    private String description;
    private BigDecimal amount;
    private LocalDate date;
    private String category;
    private String type; // "income" or "expense"
}
